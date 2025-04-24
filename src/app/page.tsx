"use client";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FormTextField } from "../components/forms/FormTextField";
import { useSnackbar } from "notistack";

export default function Home() {
  const { control } = useForm();
const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar("teste")
  return (
    <Stack>
      
    </Stack>
  );
}
