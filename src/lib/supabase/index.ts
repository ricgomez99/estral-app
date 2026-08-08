import { Platform } from "react-native";
import { supabase as supabaseNative } from "./supabase.native";
import { supabase as supabaseWeb } from "./supabase.web";

export const supabase = Platform.OS === "web" ? supabaseWeb : supabaseNative;
