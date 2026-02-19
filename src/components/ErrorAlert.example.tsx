/**
 * ERROR HANDLING USAGE EXAMPLE
 *
 * This file shows how to properly use the ErrorAlert component
 * with RTK Query mutations and queries.
 */

// @ts-nocheck - This is an example file, not used in production

import { useState } from 'react';
import ErrorAlert from './ErrorAlert';
import { useApproveDepositMutation, useRejectDepositMutation, useGetAllDepositsQuery } from '@/redux/services/adminApi';

// Mock hook for example
function useSomeMutation() {
  return [{}, {}] as any;
}

// Mock hook for example
function useGetCurrentUserQuery() {
  return [{}, {}] as any;
}

// ============================================
// EXAMPLE 1: Handling Mutation Errors (Approve/Reject)
// ============================================

export function MutationErrorExample() {
  const [errorMessage, setErrorMessage] = useState('');
  const [approveDeposit, { isLoading: approving, error: approveError }] = useApproveDepositMutation();
  const [rejectDeposit, { isLoading: rejecting, error: rejectError }] = useRejectDepositMutation();

  const handleApprove = async (depositId: string, usdAmount: number) => {
    setErrorMessage(''); // Clear previous error

    try {
      await approveDeposit({ depositId, usdAmount }).unwrap();
      setSuccessMessage('Deposit approved successfully!');
      refetch();
    } catch (err: any) {
      // Error is now properly formatted from baseApi
      setErrorMessage(err.data?.message || 'Failed to approve deposit');
    }
  };

  // Display error using ErrorAlert component
  return (
    <div>
      {errorMessage && (
        <ErrorAlert
          error={{
            status: approveError?.status,
            data: { message: errorMessage }
          }}
          onRetry={() => handleApprove(depositId, usdAmount)}
          className="mb-6"
        />
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 2: Handling Query Errors (Data Fetching)
// ============================================

export function QueryErrorExample() {
  const { data, error, isLoading, refetch } = useGetAllDepositsQuery({
    status: 'pending',
    limit: 50,
  });

  if (error) {
    return (
      <ErrorAlert
        error={error}
        onRetry={() => refetch()}
        className="my-6"
      />
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* Render data */}</div>;
}

// ============================================
// EXAMPLE 3: Handling Combined Errors
// ============================================

export function CombinedErrorExample() {
  const [localError, setLocalError] = useState<string | null>(null);
  const { error: queryError, isLoading } = useGetAllDepositsQuery();
  const [mutation, { error: mutationError }] = useSomeMutation();

  // Determine which error to show
  const activeError = queryError || mutationError || (localError ? {
    status: 400,
    data: { message: localError }
  } : null);

  return (
    <div>
      {activeError && (
        <ErrorAlert
          error={activeError}
          onRetry={() => {
            setLocalError(null);
            if (queryError) refetch();
          }}
          className="mb-6"
        />
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 4: Full Page Error Handling
// ============================================

export function FullPageExample() {
  const { data, error, isLoading, refetch } = useGetCurrentUserQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  // Error state - Full page error display
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorAlert
            error={error}
            onRetry={() => refetch()}
          />

          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state - render page content
  return <div>{/* Your page content */}</div>;
}

// ============================================
// EXAMPLE 5: Error Display in Dashboard Cards
// ============================================

export function DashboardErrorExample() {
  const { data: statsData, error: statsError } = useGetDashboardStatsQuery();

  return (
    <div className="space-y-6">
      {/* Stats Section with Error Handling */}
      {statsError ? (
        <ErrorAlert
          error={statsError}
          onRetry={() => refetchStats()}
          className="mb-6"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Render stats cards */}
        </div>
      )}

      {/* Other sections continue rendering */}
      <div>{/* Other content */}</div>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Inline Error Messages (Quick Form)
// ============================================

export function InlineErrorExample() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitError(null);

    try {
      await someMutation().unwrap();
    } catch (err: any) {
      setSubmitError(err.data?.message || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}

      {submitError && (
        <div className="mb-4">
          <ErrorAlert
            error={{
              status: 400,
              data: { message: submitError }
            }}
          />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

// ============================================
// BEST PRACTICES SUMMARY
// ============================================

/*
1. ALWAYS unwrap mutations: `.unwrap()`
   - try { await mutation().unwrap() }
   - catch (err) { handle error }

2. Use ErrorAlert for ALL errors:
   - Query errors (fetching data)
   - Mutation errors (actions)
   - Validation errors (form submissions)

3. Provide retry functionality:
   - For network errors (503)
   - For rate limiting (429)
   - For server errors (500)

4. Don't provide retry for:
   - 401 Unauthorized (redirect to login instead)
   - 403 Forbidden (user doesn't have permission)
   - Validation errors (user needs to fix input)

5. Always clear errors before retrying:
   - setErrorMessage('')
   - So old errors don't persist
*/
