import { FaPlus } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";

const Header = ({ title = "Kanban Board", onNewRequest, searchValue = "", onSearch }) => {

    return (
        <div className="header">
          <div className="header-content">
            <div className="header-left d-flex align-items-center">
              <h1 className="header-title mb-0 me-5">{title}</h1>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Search service ID, car or driver..."
                  className="header-search"
                  value={searchValue}
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </form>
            </div>
            <div className="header-right">
              <button
                className="header-button d-flex align-items-center justify-content-center"
                onClick={onNewRequest}
              >
                <FaPlus className="me-1" />New Request
              </button>
              <span className="header-button-border"></span>
              <MdOutlineNotificationsNone className="text-gray" size={24} />
            </div>
          </div>
        </div>
    );
};

export default Header;
