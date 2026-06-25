"use client";

import Link from "next/link";
import { Drawer, Button } from "@heroui/react";
import { Bars } from "@gravity-ui/icons";

export default function DashboardDrawer() {
  return (
    <Drawer>
      <Button isIconOnly>
        <Bars />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>
                Dashboard
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-2">
                <Link href="/dashboard">
                  Dashboard Home
                </Link>

                <Link href="/dashboard/user/hiring-history">
                  Hiring History
                </Link>
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}