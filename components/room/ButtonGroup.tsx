"use client"
import { useState } from 'react'
import { Button } from '../ui/button';
import { Crown, Users } from 'lucide-react';

const ButtonGroup = () => {
    const [permission, setPermission] = useState<"everyone" | "admins">(
      "everyone"
    );
    return (
        <div className="flex gap-2">
          <Button
            onClick={() => setPermission("everyone")}
            className={`flex gap-2 transition-colors ${
              permission === "everyone"
                ? "bg-green-600 text-white hover:bg-green-600"
                : "bg-muted text-muted-foreground hover:bg-muted"
            }`}
          >
            <Users />
            Everyone
          </Button>

          <Button
            onClick={() => setPermission("admins")}
            className={`flex gap-2 transition-colors ${
              permission === "admins"
                ? "bg-green-600 text-white hover:bg-green-600"
                : "bg-muted text-muted-foreground hover:bg-muted"
            }`}
          >
            <Crown />
            Admins
          </Button>
        </div>
      
    );
}

export default ButtonGroup