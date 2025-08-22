"use server";

import { auth } from "@/lib/auth";
import { requestInfo } from "rwsdk/worker";
import { signUpSchema, signInSchema } from "@/lib/validation/auth";
import { validate } from "@/lib/validation";

export async function signUp(data: unknown) {
  const validation = validate(signUpSchema, data);
  
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      error: validation.message
    };
  }

  const { email, password, name } = validation.data;
  const { request } = requestInfo;
  
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      headers: request.headers
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Sign up error:", error);
    
    // Parse Better Auth error responses
    let errorMessage = "Sign up failed";
    if (error instanceof Error) {
      try {
        // Try to parse JSON error from Better Auth
        const errorData = JSON.parse(error.message);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If not JSON, use the error message as-is
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function signIn(data: unknown) {
  const validation = validate(signInSchema, data);
  
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      error: validation.message
    };
  }

  const { email, password } = validation.data;
  const { request, response } = requestInfo;
  
  try {
    const result = await auth.api.signInEmail({
      headers: request.headers,
      body: {
        email,
        password,
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
    
    // Parse Better Auth error responses
    let errorMessage = "Sign in failed";
    if (error instanceof Error) {
      try {
        // Try to parse JSON error from Better Auth
        const errorData = JSON.parse(error.message);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If not JSON, use the error message as-is
        errorMessage = error.message;
      }
    }
    
    return { 
      success: false, 
      error: errorMessage
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