import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ant-design:dashboard-twotone",
    },
    {
        name:"Food List",
        path:"/list",
        icon:"mdi:food"
    }
  ];
  return (
    <>
      <aside
        className={`
        relative
        flex
        flex-col
        bg-orange-400
        text-white
        transition-all
        duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
      >
        <div className="flex h-16 items-center justify-between border-b border-orange-500 px-4">
          {!collapsed && <h2 className="text-xl font-bold">Admin</h2>}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-orange-600"
          >
            <Icon icon="mdi:menu" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
              flex items-center gap-3 rounded-lg px-3 py-3
              transition
              ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "text-gray-300 hover:bg-orange-600"
              }
              `
              }
            >
              <Icon icon={item?.icon} />

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
