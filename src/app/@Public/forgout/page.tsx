"use client";
import { FormTextField } from "@/src/components/forms/FormTextField";
import { useStorage } from "@/src/hooks/useStorage";
import { Stack, Paper, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Forgout() {
  const { control, formState, handleSubmit } = useForm<any>();
  const { forgout } = useStorage();
  const router = useRouter();

  const handleSignup: SubmitHandler<{
    email: string;
  }> = async ({ email }) => {
    try {
      await forgout(email);
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    }
  };

  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ px: 2, py: 4, mx: 2 }}>
        <Grid
          px={2}
          py={4}
          mx={2}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(handleSignup)}
        >
          <Grid size={12} display="flex" justifyContent="center">
            <Typography>Forgout</Typography>
          </Grid>
          <Grid size={12}>
            <FormTextField control={control} name="email" label="Email" />
          </Grid>
          <Grid size={6}>
            <Button type="button" onClick={() => router.push("/")}>
              Cancel
            </Button>
          </Grid>
          <Grid size={6}>
            <Button loading={formState.isSubmitting} type="submit">
              Send email
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
