import { NavLink } from "react-router-dom";

function Sidebar() {
    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: "⌂"
        },
        {
            label: "Documents",
            path: "/documents",
            icon: "▣"
        },
        {
            label: "Passports",
            path: "/documents/passports",
            icon: "▤"
        },
        {
            label: "Visas",
            path: "/documents/visas",
            icon: "◫"
        },
        {
            label: "Insurance",
            path: "/documents/insurance",
            icon: "◇"
        },
        {
            label: "Vaccinations",
            path: "/documents/vaccinations",
            icon: "✚"
        },
        {
            label: "Reminders",
            path: "/reminders",
            icon: "◷"
        },
        {
            label: "Travel History",
            path: "/travel-history",
            icon: "↗"
        },
        {
            label: "Destination Checklist",
            path: "/checklist/india",
            icon: "✓"
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-heading">
                <span>TRAVEL MANAGEMENT</span>
            </div>


            <nav className="sidebar-menu">

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.label}
                        </span>
                    </NavLink>
                ))}


                <div className="sidebar-divider" />


                <div className="sidebar-heading">
                    <span>ADMINISTRATION</span>
                </div>


                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `sidebar-link admin-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span className="sidebar-icon">
                        ⚙
                    </span>

                    <span>
                        Admin Panel
                    </span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;