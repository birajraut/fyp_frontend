import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../../services/auth';
import CustomButton from '../../components/ui/CustomButton';
import Input from '../../components/ui/Input';

const ResetPassword = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [email, setEmail] = useState<string>(state?.email ?? '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp || !newPassword || !confirmPassword) {
      toast.error('Please fill all the fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword({ email, otp, newPassword });
      toast.success('Password reset successful. Please login.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={state.email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // disabled={false}
            />
            <Input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-4 mt-4">
            <CustomButton
              type="submit"
              label={isLoading ? 'Resetting...' : 'Reset Password'}
              loading={isLoading}
              loadingLabel="Resetting..."
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            />
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-red-600 hover:text-red-500 text-center"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

