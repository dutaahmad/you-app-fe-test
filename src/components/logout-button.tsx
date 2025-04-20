"use client";

import { Button } from "./ui/button";
import { logoutAction } from "@/server-actions/auth-actions";

const LogoutButton = () => {
    return (
        <Button onClick={async () => await logoutAction()} variant="destructive" size="lg">
            Logout
        </Button>
    );
};

export default LogoutButton;