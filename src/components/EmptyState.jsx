import { Link } from "react-router-dom";

function EmptyState({ message = "Nothing here yet.", actionTo, actionLabel }) {
  return (
    <div className="text-center py-5">
      <div className="empty-icon-circle mx-auto mb-3">
        <i className="bi bi-inbox"></i>
      </div>
      <p className="text-muted fs-5 mb-3">{message}</p>
      {actionTo && actionLabel && (
        <Link to={actionTo} className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
