import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  initPortfolioDataFromGitHub,
  readPortfolioData,
  writePortfolioData,
} from './portfolioStorage';

const UPDATE_EVENT = 'portfolio_admin_data_updated_v1';

// Share the init promise across multiple hooks so we don't spam GitHub.
let initPromise = null;

export function usePortfolioData({ githubUser } = {}) {
  const [data, setData] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setIsInitializing(true);
    setError('');
    try {
      const stored = readPortfolioData();
      if (stored) {
        setData(stored);
        return;
      }

      if (!initPromise) {
        initPromise = initPortfolioDataFromGitHub({
          githubUser,
        })
          .then((initialData) => {
            writePortfolioData(initialData);
            return initialData;
          })
          .finally(() => {
            initPromise = null;
          });
      }

      const initialData = await initPromise;
      setData(initialData);
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
    } catch (e) {
      setError(e?.message || 'Failed to load portfolio data');
    } finally {
      setIsInitializing(false);
    }
  }, [githubUser]);

  useEffect(() => {
    load();
  }, [load]);

  // Keep all hooks in sync (admin updates should immediately reflect in view).
  useEffect(() => {
    const onUpdate = () => {
      const stored = readPortfolioData();
      if (stored) setData(stored);
    };

    window.addEventListener(UPDATE_EVENT, onUpdate);
    return () => window.removeEventListener(UPDATE_EVENT, onUpdate);
  }, []);

  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next =
        typeof updater === 'function' ? updater(prev) : { ...updater };

      if (next) writePortfolioData(next);
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
      return next;
    });
  }, []);

  const api = useMemo(
    () => ({
      data,
      isInitializing,
      error,
      updateData,
      refresh: load,
    }),
    [data, isInitializing, error, updateData, load]
  );

  return api;
}

