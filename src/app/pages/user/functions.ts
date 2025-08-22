"use server";

import { auth } from "@/lib/auth";
import { requestInfo } from "rwsdk/worker";

export async function signUp(data: { email: string; password: string; name: string }) {
  const { request } = requestInfo
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
  const { request, response } = requestInfo
  try {
    const result = await auth.api.signInEmail({
      headers: request.headers,
      body: {
        email: data.email,
        password: data.password,
      },
      asResponse: true, // Get full response with headers
    });
    
    // Get the set-cookie header from Better Auth response
    const setCookieHeader = result.headers.get('set-cookie');
    console.log("SignIn setCookieHeader from Better Auth:", setCookieHeader);
    
    if (!result.ok) {
      const error = await result.text();
      throw new Error(error || 'Sign in failed');
    }
    
    const body = await result.json();
    console.log('SignIn response body:', body);
    
    // Set the cookie header using requestInfo.response.headers
    if (setCookieHeader) {
      response.headers.set('Set-Cookie', setCookieHeader);
    }
    
    // Return plain JSON object (not Response)
    return { 
      success: true, 
      user: body 
    };
  } catch (error) {
    console.error("Sign in error:", error);
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