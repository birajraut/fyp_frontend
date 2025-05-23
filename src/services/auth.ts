/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from './axios';

export const login = async (data: any) => {
  return authApi.post('/auth/login', { ...data });
};

export const register = async (data: any) => {
  return authApi.post('/auth/register', { ...data });
};

export const OTPVerify = async (data: any) => {
  return authApi.post('/auth/otp-verify', { ...data });
};

export const resetPassword = async (data: any) => {
  return authApi.post('/auth/reset-password', { ...data });
};

export const forgotPassword = async (data: any) => {
  return authApi.post('/auth/forgot-password', { ...data });
};

