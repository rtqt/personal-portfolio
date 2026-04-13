# Implementation Plan: Delete Project Feature

## Overview

This plan implements the delete-project feature, enabling administrators to securely remove portfolio projects through the admin interface. The implementation follows the existing authentication patterns from the add-project feature and ensures complete cleanup of both database records and storage assets.

## Tasks

- [ ] 1. Implement server action for project deletion
  - [x] 1.1 Add deleteProjectAction to app/admin/actions.ts
    - Implement password validation against ADMIN_PASSWORD
    - Fetch project record using getAdminSupabase()
    - Extract filename from image URL
    - Delete image from portfolio-assets storage bucket
    - Delete project record from database
    - Call revalidatePath('/') to update homepage cache
    - Return success or error response
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4_
  
  - [-] 1.2 Write property test for authentication guards deletion
    - **Property 1: Authentication Guards Deletion**
    - **Validates: Requirements 1.1, 1.2**
  
  - [~] 1.3 Write property test for successful deletion removes database record
    - **Property 2: Successful Deletion Removes Database Record**
    - **Validates: Requirements 2.1**
  
  - [~] 1.4 Write property test for non-existent projects return errors
    - **Property 3: Non-Existent Projects Return Errors**
    - **Validates: Requirements 2.3**
  
  - [~] 1.5 Write property test for image cleanup accompanies deletion
    - **Property 4: Image Cleanup Accompanies Deletion**
    - **Validates: Requirements 3.2**
  
  - [~] 1.6 Write property test for image deletion precedes database deletion
    - **Property 5: Image Deletion Precedes Database Deletion**
    - **Validates: Requirements 3.4, 5.1**
  
  - [~] 1.7 Write unit tests for deleteProjectAction
    - Test correct password happy path
    - Test empty password edge case
    - Test missing ADMIN_PASSWORD configuration
    - Test project with missing image (orphaned record)
    - Test malformed image URL handling
    - Verify revalidatePath is called on success
    - Verify getAdminSupabase is used
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.3, 3.3, 5.3, 5.4_

- [ ] 2. Checkpoint - Verify server action implementation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Create delete project admin page
  - [~] 3.1 Create app/admin/delete/page.tsx client component
    - Set up component state (projects, selectedProject, password, isPending, errorMsg, successMsg)
    - Implement useEffect to fetch projects list on mount using public Supabase client
    - Create project list display with num, title, and thumbnail
    - Add delete button for each project
    - Implement confirmation dialog with password input
    - Handle form submission to deleteProjectAction
    - Display loading state during deletion
    - Show success/error messages based on response
    - Refresh project list on successful deletion
    - Apply consistent styling matching app/admin/add/page.tsx
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  
  - [~] 3.2 Write property test for all projects appear in admin list
    - **Property 6: All Projects Appear in Admin List**
    - **Validates: Requirements 4.1**
  
  - [~] 3.3 Write property test for failures return descriptive errors
    - **Property 7: Failures Return Descriptive Errors**
    - **Validates: Requirements 5.4**
  
  - [~] 3.4 Write property test for response format consistency
    - **Property 8: Response Format Consistency**
    - **Validates: Requirements 6.3**
  
  - [~] 3.5 Write unit tests for delete page component
    - Test project list rendering
    - Test delete button click opens confirmation dialog
    - Test password input validation
    - Test successful deletion flow
    - Test error message display
    - Test loading state during deletion
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 4. Add navigation to delete page
  - [~] 4.1 Add link to delete page in admin navigation
    - Update admin layout or add navigation component
    - Add link to /admin/delete with appropriate styling
    - _Requirements: 4.1_

- [ ] 5. Final checkpoint - End-to-end verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check library (minimum 100 iterations)
- Unit tests validate specific examples and edge cases
- The server action follows the same pattern as addProjectAction for consistency
- Image deletion occurs before database deletion to prevent orphaned storage
- Missing images (404) are treated as warnings to handle orphaned database records gracefully
