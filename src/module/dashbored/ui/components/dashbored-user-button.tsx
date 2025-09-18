"use client";
import GeneratedAvtar from "@/components/generated-avtar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboredUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();
  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/SignIn");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
     <Drawer>
  <DrawerTrigger className="flex items-center justify-between border rounded-lg border-border/10 w-full bg-white/5 p-4 overflow-hidden hover:bg-white/10">
     {data?.user?.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvtar
            seed={data.user.name}
            varient="initials"
            className="size-8 mr-3"
          />
        )}

        <div className=" flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 ">
          <p className="truncate font-sm w-full">{data.user.name}</p>
          <p className="truncate text-xs text-muted-foreground w-full">
            {" "}
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-5 shrink-0" />
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>{data?.user?.name}</DrawerTitle>
      <DrawerDescription>{data?.user?.email}</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button variant="outline">
        <CreditCardIcon className="size-5 mr-2" /> Billing
      </Button>
      <Button variant="outline" onClick={onSignOut}>
        <LogOutIcon className="size-5 mr-2" /> Logout
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between border rounded-lg  border-border/10 w-full bg-white/5 p-4 overflow-hidden hover:bg-white/10 ">
        {data?.user?.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvtar
            seed={data.user.name}
            varient="initials"
            className="size-8 mr-3"
          />
        )}

        <div className=" flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 ">
          <p className="truncate font-sm w-full">{data.user.name}</p>
          <p className="truncate text-xs text-muted-foreground w-full">
            {" "}
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-5 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-xs text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onSignOut}
          className="cursor-pointer flex items-center justify-between"
        >
          LogOut
          <LogOutIcon className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboredUserButton;
