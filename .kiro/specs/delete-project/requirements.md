# Requirements Document

## Introduction

This feature adds the ability to delete projects from the portfolio admin interface. Administrators will be able to remove projects from both the Supabase database and the associated image files from the storage bucket, ensuring complete cleanup of project data.

## Glossary

- **Admin_Interface**: The password-protected web interface at /admin for managing portfolio projects
- **Delete_System**: The server-side system responsible for removing projects and their associated assets
- **Project**: A portfolio item stored in the Supabase projects table with associated metadata and image
- **Storage_Bucket**: The Supabase 'portfolio-assets' storage bucket containing project images
- **Admin_Password**: The environment variable ADMIN_PASSWORD used for authentication
- **Image_Path**: The file path or URL reference to a project's image in the storage bucket

## Requirements

### Requirement 1: Admin Authentication for Deletion

**User Story:** As an administrator, I want to authenticate before deleting projects, so that unauthorized users cannot remove portfolio content.

#### Acceptance Criteria

1. WHEN a delete request is submitted, THE Delete_System SHALL validate the provided password against the Admin_Password
2. IF the password is invalid, THEN THE Delete_System SHALL return an authentication error and prevent deletion
3. IF the Admin_Password is not configured, THEN THE Delete_System SHALL return a configuration error

### Requirement 2: Project Deletion from Database

**User Story:** As an administrator, I want to remove project records from the database, so that deleted projects no longer appear in the portfolio.

#### Acceptance Criteria

1. WHEN a valid delete request is received, THE Delete_System SHALL remove the project record from the projects table
2. THE Delete_System SHALL use the getAdminSupabase() client for privileged database operations
3. IF the project does not exist in the database, THEN THE Delete_System SHALL return a not found error
4. WHEN a project is successfully deleted, THE Delete_System SHALL revalidate the homepage cache

### Requirement 3: Image Asset Cleanup

**User Story:** As an administrator, I want project images to be removed from storage when deleting projects, so that unused assets don't accumulate in the storage bucket.

#### Acceptance Criteria

1. WHEN a project is deleted, THE Delete_System SHALL extract the Image_Path from the project record
2. THE Delete_System SHALL remove the image file from the Storage_Bucket
3. IF the image file does not exist in storage, THE Delete_System SHALL log a warning and continue with project deletion
4. THE Delete_System SHALL delete the database record only after successfully removing the image file

### Requirement 4: Delete Interface

**User Story:** As an administrator, I want a user interface to select and delete projects, so that I can manage my portfolio without direct database access.

#### Acceptance Criteria

1. THE Admin_Interface SHALL display a list of existing projects with their titles and numbers
2. WHEN an administrator selects a project to delete, THE Admin_Interface SHALL prompt for password confirmation
3. THE Admin_Interface SHALL display a confirmation dialog before submitting the delete request
4. WHEN deletion is in progress, THE Admin_Interface SHALL display a loading state
5. WHEN deletion succeeds, THE Admin_Interface SHALL display a success message and refresh the project list
6. IF deletion fails, THEN THE Admin_Interface SHALL display the error message returned by the Delete_System

### Requirement 5: Error Handling and Rollback

**User Story:** As an administrator, I want reliable error handling during deletion, so that partial deletions don't leave the system in an inconsistent state.

#### Acceptance Criteria

1. IF image deletion fails, THEN THE Delete_System SHALL not proceed with database deletion
2. IF database deletion fails after image deletion, THEN THE Delete_System SHALL return an error indicating orphaned storage
3. THE Delete_System SHALL log all deletion errors with sufficient detail for debugging
4. WHEN any deletion step fails, THE Delete_System SHALL return a descriptive error message to the Admin_Interface

### Requirement 6: Server Action Implementation

**User Story:** As a developer, I want deletion to use Next.js server actions, so that the implementation follows the existing secure pattern used for adding projects.

#### Acceptance Criteria

1. THE Delete_System SHALL be implemented as a server action in app/admin/actions.ts
2. THE Delete_System SHALL accept FormData containing the password and project identifier
3. THE Delete_System SHALL return an object with either a success flag or an error message
4. THE Delete_System SHALL use the "use server" directive for server-side execution
