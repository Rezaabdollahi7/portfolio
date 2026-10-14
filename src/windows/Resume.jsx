import { createPortal } from "react-dom";
import { Download, Printer } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import ResumeDocument from "../components/ResumeDocument";
import { profile } from "#constants";
import { useT } from "../i18n";

const RESUME_PDF = profile.resumeUrl;

const Resume = () => {
  const t = useT();
  return (
  <>
    <WindowHeader title={t("resume.title")}>
      <div className="header-actions" data-no-drag>
        <button
          type="button"
          className="toolbar-btn max-md:hidden"
          onClick={() => window.print()}
          aria-label={t("resume.print")}
        >
          <Printer aria-hidden="true" />
        </button>
        <a
          className="toolbar-btn"
          href={RESUME_PDF}
          download
          aria-label={t("resume.download")}
        >
          <Download aria-hidden="true" />
        </a>
      </div>
    </WindowHeader>
    <div className="window-body resume-viewer">
      <div className="resume-paper ltr" lang="en">
        <ResumeDocument />
      </div>
      <a className="btn btn-primary resume-download" href={RESUME_PDF} download>
        <Download aria-hidden="true" /> {t("resume.downloadPdf")}
      </a>
    </div>
    {createPortal(
      <div className="print-root">
        <ResumeDocument />
      </div>,
      document.body,
    )}
  </>
  );
};

export default Resume;
