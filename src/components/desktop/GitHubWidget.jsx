import { useMemo } from "react";
import clsx from "clsx";
import { ArrowUpRight, GitCommitHorizontal, Github } from "lucide-react";
import { useGitHubActivity } from "../../hooks/useGitHubActivity";
import { GITHUB_URL, GITHUB_USER, buildWeeks } from "../../lib/github";
import { formatDate, relativeTime, useLocale, useT } from "../../i18n";

// Live GitHub activity: the contribution calendar and the latest commits.
const GitHubWidget = ({ className, weeks = 22, commits: maxCommits = 2 }) => {
  const t = useT();
  const locale = useLocale();
  const { status, data } = useGitHubActivity();

  // Persian weeks start on Saturday, like the calendar widget.
  const days = useMemo(
    () => (data ? buildWeeks(data, weeks, locale === "fa" ? 6 : 0) : []),
    [data, weeks, locale],
  );
  const total = data?.total ?? days.reduce((sum, d) => sum + d.count, 0);

  return (
    <section className={clsx("widget gh-widget", className)} aria-label={t("gh.title")}>
      <a className="gh-head" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label={t("gh.open")}>
        <Github aria-hidden="true" className="gh-logo" />
        <span className="gh-handle ltr">{GITHUB_USER}</span>
        {data && (
          <span className="gh-total" aria-hidden="true">
            {t(data.total != null ? "gh.total" : "gh.recent", { count: total })}
          </span>
        )}
        <ArrowUpRight aria-hidden="true" className="gh-open rtl-flip" />
      </a>

      {status === "loading" && (
        <div className="gh-loading" role="status">
          <span className="sr-only">{t("gh.loading")}</span>
          <span className="gh-skeleton is-graph" />
          <span className="gh-skeleton" />
          <span className="gh-skeleton is-short" />
        </div>
      )}

      {status === "error" && <p className="gh-error">{t("gh.error")}</p>}

      {data && (
        <>
          <div
            className="gh-graph"
            role="img"
            aria-label={t(data.total != null ? "gh.contributions" : "gh.recent", { count: total })}
          >
            {days.map((d) => (
              <span
                key={d.key}
                className="gh-cell"
                data-level={d.level}
                title={t("gh.dayCount", {
                  count: d.count,
                  date: formatDate(d.date, { month: "short", day: "numeric" }, locale),
                })}
              />
            ))}
          </div>

          {data.commits.length > 0 && (
            <ul className="gh-commits" aria-label={t("gh.latest")}>
              {data.commits.slice(0, maxCommits).map((c) => (
                <li key={c.id}>
                  <a className="gh-commit" href={c.url} target="_blank" rel="noopener noreferrer">
                    <GitCommitHorizontal aria-hidden="true" className="gh-commit-icon" />
                    <span className="gh-repo ltr">{c.repo}</span>
                    <span className="gh-msg" dir="auto">
                      {c.message || t("gh.pushed", { branch: c.branch ?? "main" })}
                    </span>
                    <time className="gh-time" dateTime={c.date}>
                      {relativeTime(c.date, locale)}
                    </time>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
};

export default GitHubWidget;
