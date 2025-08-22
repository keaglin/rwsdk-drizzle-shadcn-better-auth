"use server";

import { auth } from "@/app/lib/auth";
import { requestInfo } from "rwsdk/worker";

export async function signUp(data: { email: string; password: string; name: string }) {
  const { request} = requestInfo
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      headers: request.headers
    });
    
    return { success: true, data: response };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Sign up failed" 
    };
  }
}

export async function signIn(data: { email: string; password: string }) {
  const { request } = requestInfo
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      headers: request.headers
    });
    
    return { success: true, data: response };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Sign in failed" 
    };
  }
}

export async function signOut() {
  const { request } = requestInfo
  try {
    await auth.api.signOut({
      headers: request.headers
    });
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Sign out failed" 
    };
  }
}

export async function getSession() {
  const { request } = requestInfo
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    return { success: true, data: session };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to get session" 
    };
  }
}