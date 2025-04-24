"use client";
import { FormPassword } from "@/src/components/forms/FormPassword";
import { FormTextField } from "@/src/components/forms/FormTextField";
import { useStorage } from "@/src/hooks/useStorage";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Private() {
  const { control } = useForm();
  const router = useRouter();
  const { signOut } = useStorage();

  async function handleSignOut() {
    await signOut();
    await router.refresh();
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <Button onClick={() => handleSignOut()}>Logout</Button>
    </Stack>
  );
}
