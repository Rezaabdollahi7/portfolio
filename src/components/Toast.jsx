import { Check } from "lucide-react";
import useUiStore from "#store/ui";

const Toast = () => {
  const toast = useUiStore((s) => s.toast);
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className="toast">
          <Check aria-hidden="true" />
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Toast;
