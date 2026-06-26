"use client";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";

export function CustomTrigger({ handleLogout }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full bg-slate-900">
        <Avatar>
          <Avatar.Image
            alt={user?.name || "User"}
            src={user?.image || ""}
          />
          <Avatar.Fallback delayMs={600}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        {/* User Info */}
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={user?.name || "User"}
                src={user?.image || ""}
              />
              <Avatar.Fallback delayMs={600}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.name || "User"}</p>
              <p className="text-xs leading-none text-muted">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <Dropdown.Menu>

      

          <Dropdown.Item
            key="logout"
            onClick={handleLogout}
            textValue="Logout"
            variant="danger"
          >
            <div className="flex w-full items-center justify-between gap-2 text-foreground">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}