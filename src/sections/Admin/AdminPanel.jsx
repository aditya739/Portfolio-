import { useEffect, useMemo, useState } from 'react';
import styles from './AdminPanelStyles.module.css';
import { usePortfolioData } from '../../admin/usePortfolioData';
import {
  isAdminUnlocked,
  lockAdmin,
  unlockAdmin,
} from '../../admin/adminAuth';
import { STORAGE_KEY } from '../../admin/portfolioStorage';

function AdminPanel() {
  const { data, isInitializing, error, updateData, refresh } = usePortfolioData();
  const [unlocked, setUnlocked] = useState(isAdminUnlocked());
  const [tab, setTab] = useState('skills');

  // Login state
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Skills form state
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillName, setSkillName] = useState('');

  // Projects form state
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectLanguage, setProjectLanguage] = useState('');
  const [projectFeatured, setProjectFeatured] = useState(false);

  useEffect(() => {
    setUnlocked(isAdminUnlocked());
  }, []);

  const skills = useMemo(() => data?.skills ?? [], [data]);
  const projects = useMemo(() => data?.projects ?? [], [data]);

  const resetSkillForm = () => {
    setEditingSkillId(null);
    setSkillName('');
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectName('');
    setProjectDescription('');
    setProjectLink('');
    setProjectLanguage('');
    setProjectFeatured(false);
  };

  const onLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const ok = unlockAdmin(password);
    if (!ok) {
      setLoginError('Incorrect password');
      return;
    }
    setUnlocked(true);
    setPassword('');
  };

  const onLogout = () => {
    lockAdmin();
    setUnlocked(false);
    resetSkillForm();
    resetProjectForm();
  };

  const resetToDefaults = () => {
    const ok = window.confirm(
      'Reset Skills + Projects back to the default data (re-initialize from GitHub and defaults).'
    );
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    refresh();
  };

  const onSaveSkill = (e) => {
    e.preventDefault();
    const name = skillName.trim();
    if (!name) return;

    updateData((prev) => {
      const nextSkills = prev.skills ?? [];
      if (editingSkillId) {
        return {
          ...prev,
          skills: nextSkills.map((s) =>
            s.id === editingSkillId ? { ...s, name } : s
          ),
          updatedAt: Date.now(),
        };
      }

      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Math.random()).replace(/\W+/g, '');

      return {
        ...prev,
        skills: [...nextSkills, { id, name }],
        updatedAt: Date.now(),
      };
    });

    resetSkillForm();
  };

  const onDeleteSkill = (id) => {
    const ok = window.confirm('Delete this skill?');
    if (!ok) return;
    updateData((prev) => ({
      ...prev,
      skills: (prev.skills ?? []).filter((s) => s.id !== id),
      updatedAt: Date.now(),
    }));
  };

  const startEditSkill = (id) => {
    const s = skills.find((x) => x.id === id);
    if (!s) return;
    setEditingSkillId(id);
    setSkillName(s.name);
    setTab('skills');
  };

  const applyFeaturedRule = (nextProjects, desiredFeaturedId) => {
    let updated = nextProjects.map((p) => ({
      ...p,
      featured: desiredFeaturedId ? p.id === desiredFeaturedId : p.featured,
    }));

    if (desiredFeaturedId) {
      updated = updated.map((p) => ({ ...p, featured: p.id === desiredFeaturedId }));
    }

    // Ensure at least one featured project.
    if (!updated.some((p) => p.featured) && updated.length > 0) {
      updated[0] = { ...updated[0], featured: true };
    }

    return updated;
  };

  const onSaveProject = (e) => {
    e.preventDefault();
    const name = projectName.trim();
    if (!name) return;

    const description = projectDescription.trim();
    const link = projectLink.trim();
    const language = projectLanguage.trim() || 'Full Stack';
    const featured = Boolean(projectFeatured);

    updateData((prev) => {
      const nextProjects = prev.projects ?? [];

      let updated;
      if (editingProjectId) {
        updated = nextProjects.map((p) =>
          p.id === editingProjectId
            ? {
                ...p,
                name,
                description,
                link,
                language,
                stars: p.stars ?? 0,
                createdAt: p.createdAt ?? '',
              }
            : p
        );
      } else {
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Math.random()).replace(/\W+/g, '');
        updated = [
          ...nextProjects,
          {
            id,
            name,
            description,
            link,
            language,
            featured,
            stars: 0,
            createdAt: '',
            updatedAt: Date.now(),
          },
        ];
      }

      // Apply featured constraint.
      if (featured) {
        const desiredFeaturedId =
          editingProjectId || (updated.length > 0 ? updated[updated.length - 1].id : null);
        return {
          ...prev,
          projects: applyFeaturedRule(updated, desiredFeaturedId),
          updatedAt: Date.now(),
        };
      }

      // Keep existing featured value when editing; but ensure at least one exists.
      const anyFeatured = updated.some((p) => p.featured);
      const fixed = anyFeatured
        ? updated
        : updated.map((p, idx) => (idx === 0 ? { ...p, featured: true } : p));

      // If editing and featured checkbox is false, explicitly unset it.
      if (editingProjectId && !featured) {
        return {
          ...prev,
          projects: applyFeaturedRule(
            fixed.map((p) => (p.id === editingProjectId ? { ...p, featured: false } : p)),
            null
          ),
          updatedAt: Date.now(),
        };
      }

      return { ...prev, projects: fixed, updatedAt: Date.now() };
    });

    resetProjectForm();
  };

  const onDeleteProject = (id) => {
    const ok = window.confirm('Delete this project?');
    if (!ok) return;

    updateData((prev) => {
      const remaining = (prev.projects ?? []).filter((p) => p.id !== id);
      if (!remaining.length) return { ...prev, projects: [], updatedAt: Date.now() };
      const anyFeatured = remaining.some((p) => p.featured);
      const fixed = anyFeatured ? remaining : remaining.map((p, idx) => (idx === 0 ? { ...p, featured: true } : p));
      return { ...prev, projects: fixed, updatedAt: Date.now() };
    });
  };

  const startEditProject = (id) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setEditingProjectId(id);
    setProjectName(p.name ?? '');
    setProjectDescription(p.description ?? '');
    setProjectLink(p.link ?? '');
    setProjectLanguage(p.language ?? '');
    setProjectFeatured(Boolean(p.featured));
    setTab('projects');
  };

  return (
    <section id="admin" className={styles.container}>
      <h1 className="sectionTitle">Admin Panel</h1>

      {isInitializing && <div className={styles.note}>Loading editable data...</div>}
      {!isInitializing && error && <div className={styles.error}>{error}</div>}

      {!isInitializing && (
        <div className={styles.panel}>
          {!unlocked ? (
            <div className={styles.loginCard}>
              <form onSubmit={onLogin} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="adminPassword">Password</label>
                  <input
                    id="adminPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <button className={styles.primaryBtn} type="submit">
                  Unlock Admin
                </button>
                {loginError && <div className={styles.error}>{loginError}</div>}
              </form>
            </div>
          ) : (
            <>
              <div className={styles.topRow}>
                <div className={styles.tabs} role="tablist" aria-label="Admin tabs">
                  <button
                    type="button"
                    className={`${styles.tabBtn} ${tab === 'skills' ? styles.tabBtnActive : ''}`}
                    onClick={() => setTab('skills')}
                  >
                    Skills
                  </button>
                  <button
                    type="button"
                    className={`${styles.tabBtn} ${tab === 'projects' ? styles.tabBtnActive : ''}`}
                    onClick={() => setTab('projects')}
                  >
                    Projects
                  </button>
                </div>

                <button type="button" className={styles.ghostBtn} onClick={onLogout}>
                  Lock
                </button>

                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={resetToDefaults}
                  title="Clear localStorage and re-initialize from defaults"
                >
                  Reset Defaults
                </button>
              </div>

              {tab === 'skills' && (
                <div className={styles.grid2}>
                  <div className={styles.sectionCard}>
                    <h2 className={styles.sectionTitle}>{editingSkillId ? 'Edit Skill' : 'Add Skill'}</h2>
                    <form onSubmit={onSaveSkill} className={styles.form}>
                      <div className={styles.field}>
                        <label htmlFor="skillName">Skill name</label>
                        <input
                          id="skillName"
                          type="text"
                          value={skillName}
                          onChange={(e) => setSkillName(e.target.value)}
                          placeholder="e.g. React.js"
                          required
                        />
                      </div>
                      <div className={styles.btnRow}>
                        <button className={styles.primaryBtn} type="submit">
                          Save
                        </button>
                        <button
                          className={styles.ghostBtn}
                          type="button"
                          onClick={resetSkillForm}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className={styles.sectionCard}>
                    <h2 className={styles.sectionTitle}>Existing Skills</h2>
                    {skills.length === 0 ? (
                      <p className={styles.note}>No skills yet.</p>
                    ) : (
                      <div className={styles.list}>
                        {skills.map((s) => (
                          <div key={s.id} className={styles.item}>
                            <div className={styles.itemMain}>
                              <div className={styles.itemName}>{s.name}</div>
                            </div>
                            <div className={styles.itemActions}>
                              <button
                                type="button"
                                className={styles.smallBtn}
                                onClick={() => startEditSkill(s.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className={styles.smallBtnDanger}
                                onClick={() => onDeleteSkill(s.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {tab === 'projects' && (
                <div className={styles.grid2}>
                  <div className={styles.sectionCard}>
                    <h2 className={styles.sectionTitle}>
                      {editingProjectId ? 'Edit Project' : 'Add Project'}
                    </h2>
                    <form onSubmit={onSaveProject} className={styles.form}>
                      <div className={styles.field}>
                        <label htmlFor="projectName">Project name</label>
                        <input
                          id="projectName"
                          type="text"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="e.g. PayOrchestrator"
                          required
                        />
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="projectDescription">Description</label>
                        <textarea
                          id="projectDescription"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          placeholder="Short, impact-focused description..."
                        />
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="projectLink">GitHub / Demo link</label>
                        <input
                          id="projectLink"
                          type="url"
                          value={projectLink}
                          onChange={(e) => setProjectLink(e.target.value)}
                          placeholder="https://github.com/..."
                        />
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="projectLanguage">Language / Tech</label>
                        <input
                          id="projectLanguage"
                          type="text"
                          value={projectLanguage}
                          onChange={(e) => setProjectLanguage(e.target.value)}
                          placeholder="e.g. MERN / Node.js / React"
                        />
                      </div>

                      <div className={styles.checkboxRow}>
                        <input
                          id="projectFeatured"
                          type="checkbox"
                          checked={projectFeatured}
                          onChange={(e) => setProjectFeatured(e.target.checked)}
                        />
                        <label htmlFor="projectFeatured">Featured</label>
                      </div>

                      <div className={styles.btnRow}>
                        <button className={styles.primaryBtn} type="submit">
                          Save
                        </button>
                        <button
                          className={styles.ghostBtn}
                          type="button"
                          onClick={resetProjectForm}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className={styles.sectionCard}>
                    <div className={styles.sectionHeaderRow}>
                      <h2 className={styles.sectionTitle}>Existing Projects</h2>
                      <button type="button" className={styles.smallBtn} onClick={refresh} title="Reload from localStorage">
                        Reload
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <p className={styles.note}>No projects yet.</p>
                    ) : (
                      <div className={styles.list}>
                        {projects.map((p) => (
                          <div key={p.id} className={styles.item}>
                            <div className={styles.itemMain}>
                              <div className={styles.itemName}>
                                {p.name}{' '}
                                {p.featured && <span className={styles.featuredTag}>Featured</span>}
                              </div>
                              <div className={styles.itemMeta}>
                                {p.language ? p.language : 'Full Stack'}
                                {typeof p.stars === 'number' && (
                                  <span className={styles.muted}> · {p.stars}★</span>
                                )}
                              </div>
                            </div>
                            <div className={styles.itemActions}>
                              <button
                                type="button"
                                className={styles.smallBtn}
                                onClick={() => startEditProject(p.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className={styles.smallBtnDanger}
                                onClick={() => onDeleteProject(p.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default AdminPanel;

