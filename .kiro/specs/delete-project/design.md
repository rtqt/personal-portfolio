# Design Document: Delete Project Feature

## Overview

The delete-project feature enables administrators to remove portfolio projects through a secure web interface. This feature extends the existing admin functionality by providing project deletion capabilities that mirror the authentication and security patterns established in the add-project feature.

The system performs two critical operations: removing the project record from the Supabase database and cleaning up the associated image file from the storage bucket. The design prioritizes data consistency by ensuring images are deleted before database records, preventing orphaned storage assets.

### Key Design Goals

- Maintain consistency with existing admin authentication patterns
- Ensure complete cleanup of both database records and storage assets
- Provide clear user feedback throughout the deletion process
- Prevent partial deletions that could leave the system in an inconsistent state
- Follow Next.js server action patterns for secure server-side operations

## Architecture

### System Components

The delete-project feature integrates into the existing admin architecture with minimal changes:

```
┌─────────────────────────────────────────────────────────┐
│                    Admin Interface                       │
│                  /admin/delete/page.tsx                  │
│  ┌────────────────────────────────────────────────┐    │
│  │  - Project List Display                        │    │
│  │  - Delete Button per Project                   │    │
│  │  - Password Confirmation Dialog                │    │
│  │  - Success/Error Message Display               │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │ FormData (password, projectId)
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Server Action Layer                         │
│            app/admin/actions.ts                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  deleteProjectAction(formData)                 │    │
│  │  1. Validate admin password                    │    │
│  │  2. Fetch project record                       │    │
│  │  3. Delete image from storage                  │    │
│  │  4. Delete database record                     │    │
│  │  5. Revalidate homepage cache                  │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Supabase Layer                          │
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │  Database (projects) │  │  Storage Bucket      │    │
│  │  - SELECT by id      │  │  - DELETE file       │    │
│  │  - DELETE record     │  │  (portfolio-assets)  │    │
│  └──────────────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```


### Execution Flow

The deletion process follows a strict sequence to maintain data consistency:

1. **Authentication**: Validate admin password against environment variable
2. **Project Lookup**: Fetch project record to obtain image path
3. **Image Deletion**: Remove image file from Supabase storage bucket
4. **Database Deletion**: Remove project record from database
5. **Cache Invalidation**: Revalidate homepage to reflect changes

This order ensures that if any step fails, the system remains in a consistent state. Images are deleted before database records to prevent orphaned storage assets.

## Components and Interfaces

### Server Action: deleteProjectAction

Located in `app/admin/actions.ts`, this server action handles the complete deletion workflow.

**Function Signature:**
```typescript
export async function deleteProjectAction(formData: FormData): Promise<{
  success?: boolean;
  error?: string;
}>
```

**Input Parameters (via FormData):**
- `password` (string): Admin password for authentication
- `projectId` (string): Unique identifier of the project to delete

**Return Value:**
- Success case: `{ success: true }`
- Error case: `{ error: string }` with descriptive error message

**Implementation Details:**

The function performs the following operations in sequence:

1. **Password Validation**
   - Extract password from FormData
   - Compare against `process.env.ADMIN_PASSWORD`
   - Return error if password is invalid or not configured

2. **Project Retrieval**
   - Use `getAdminSupabase()` to create privileged client
   - Query projects table: `SELECT * FROM projects WHERE id = projectId`
   - Return error if project not found

3. **Image Deletion**
   - Extract image URL from project record
   - Parse filename from URL (format: `https://...supabase.co/storage/v1/object/public/portfolio-assets/{filename}`)
   - Delete from storage: `supabase.storage.from('portfolio-assets').remove([filename])`
   - Log warning if image deletion fails, but continue (handles orphaned records)

4. **Database Deletion**
   - Delete project: `supabase.from('projects').delete().eq('id', projectId)`
   - Return error if deletion fails

5. **Cache Revalidation**
   - Call `revalidatePath('/')` to update homepage immediately
   - Return success response


### Admin UI Component: Delete Project Page

Located at `app/admin/delete/page.tsx`, this client component provides the user interface for project deletion.

**Component Structure:**

```typescript
"use client";

interface Project {
  id: string;
  num: string;
  title: string;
  image: string;
  // ... other fields
}

export default function DeleteProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // ... implementation
}
```

**Key Functionality:**

1. **Project List Display**
   - Fetch projects on component mount using public Supabase client
   - Display projects in a list with num, title, and thumbnail
   - Show delete button for each project

2. **Deletion Workflow**
   - User clicks delete button → opens confirmation dialog
   - Dialog prompts for password and confirms deletion intent
   - On confirmation, submit FormData to `deleteProjectAction`
   - Display loading state during deletion
   - Show success/error message based on response
   - Refresh project list on successful deletion

3. **State Management**
   - `projects`: Array of all projects from database
   - `selectedProject`: ID of project pending deletion
   - `password`: Admin password input
   - `isPending`: Loading state during deletion
   - `errorMsg`/`successMsg`: User feedback messages

**UI Patterns:**

The component follows the existing admin interface styling from `app/admin/add/page.tsx`:
- Warm color palette with accent colors
- Semi-transparent backgrounds with subtle borders
- Clear error/success message styling
- Responsive form layouts
- Loading states on buttons


## Data Models

### Project Model

The project model is defined by the Supabase database schema and TypeScript interface:

```typescript
interface Project {
  id: string;           // Primary key (auto-generated UUID)
  num: string;          // Display number (e.g., "01", "02")
  title: string;        // Project title
  impact: string;       // Impact statement
  desc: string;         // Full description
  tags: string[];       // Array of technology tags
  image: string;        // Full URL to image in storage bucket
  imageAlt: string;     // Alt text for accessibility
  liveUrl: string;      // Optional live demo URL
  githubUrl: string;    // Optional GitHub repository URL
  created_at: string;   // Timestamp (auto-generated)
}
```

**Key Fields for Deletion:**
- `id`: Used to identify the project to delete
- `image`: Contains the full URL needed to extract the filename for storage deletion

### Image URL Structure

Images are stored in the Supabase storage bucket with the following URL pattern:

```
https://{project-id}.supabase.co/storage/v1/object/public/portfolio-assets/{filename}
```

**Filename Extraction:**
To delete an image, we need to extract the filename from the full URL:

```typescript
// Example image URL
const imageUrl = "https://abc123.supabase.co/storage/v1/object/public/portfolio-assets/1234567890-abc123.jpg";

// Extract filename
const urlParts = imageUrl.split('/');
const filename = urlParts[urlParts.length - 1]; // "1234567890-abc123.jpg"
```

### FormData Structure

The delete action receives data in the following format:

```typescript
FormData {
  password: string;    // Admin password for authentication
  projectId: string;   // UUID of project to delete
}
```

### Response Model

Both success and error responses follow a consistent structure:

```typescript
type ActionResponse = 
  | { success: true }
  | { error: string };
```

This matches the pattern used in `addProjectAction` for consistency.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

Before defining the final properties, I analyzed the testable acceptance criteria for redundancy:

**Identified Redundancies:**
- Properties 1.1 and 1.2 (password validation and invalid password errors) can be combined into a single comprehensive authentication property
- Property 2.1 (database deletion) is the core behavior that other properties build upon
- Property 3.2 (image removal) and 3.4 (ordering constraint) are related but test different aspects - kept separate
- Property 5.1 (rollback on image failure) and 5.4 (error messages on failure) test different aspects - kept separate
- Property 6.3 (response format) is subsumed by other properties that check for success/error responses

**Final Property Set:**
After eliminating redundancy, the following properties provide comprehensive coverage without overlap:

### Property 1: Authentication Guards Deletion

*For any* delete request with an incorrect password, the system SHALL return an authentication error and SHALL NOT modify the database or storage.

**Validates: Requirements 1.1, 1.2**

### Property 2: Successful Deletion Removes Database Record

*For any* valid project and correct admin password, after deletion completes successfully, querying the database for that project SHALL return no results.

**Validates: Requirements 2.1**

### Property 3: Non-Existent Projects Return Errors

*For any* project ID that does not exist in the database, attempting deletion SHALL return a not found error and SHALL NOT modify any storage or database records.

**Validates: Requirements 2.3**

### Property 4: Image Cleanup Accompanies Deletion

*For any* project with an associated image, after successful deletion, the image file SHALL no longer exist in the storage bucket.

**Validates: Requirements 3.2**

### Property 5: Image Deletion Precedes Database Deletion

*For any* project, if image deletion fails, the database record SHALL remain unchanged and an error SHALL be returned.

**Validates: Requirements 3.4, 5.1**

### Property 6: All Projects Appear in Admin List

*For any* set of projects in the database, the admin interface SHALL display all projects with their titles and numbers.

**Validates: Requirements 4.1**

### Property 7: Failures Return Descriptive Errors

*For any* deletion operation that fails at any step, the system SHALL return an error response (not success) with a non-empty error message.

**Validates: Requirements 5.4**

### Property 8: Response Format Consistency

*For any* call to deleteProjectAction, the response SHALL contain either a success field set to true OR an error field with a string value, but never both or neither.

**Validates: Requirements 6.3**


## Error Handling

The delete-project feature implements comprehensive error handling to maintain system consistency and provide clear user feedback.

### Error Categories

**1. Authentication Errors**
- **Missing Admin Password**: When `ADMIN_PASSWORD` environment variable is not set
  - Response: `{ error: "Server misconfiguration: No ADMIN_PASSWORD set" }`
  - Action: Return immediately, no database or storage operations performed
  
- **Invalid Password**: When provided password doesn't match `ADMIN_PASSWORD`
  - Response: `{ error: "Invalid admin password" }`
  - Action: Return immediately, no database or storage operations performed

**2. Validation Errors**
- **Missing Project ID**: When projectId is not provided in FormData
  - Response: `{ error: "Missing required field: projectId" }`
  - Action: Return immediately
  
- **Project Not Found**: When project ID doesn't exist in database
  - Response: `{ error: "Project not found" }`
  - Action: Return immediately, no storage operations performed

**3. Storage Errors**
- **Image Deletion Failure**: When storage bucket deletion fails
  - Response: `{ error: "Failed to delete image: {storage error message}" }`
  - Action: Log error, do NOT proceed with database deletion
  - Note: If image doesn't exist (404), log warning but continue (handles orphaned records)

**4. Database Errors**
- **Database Deletion Failure**: When database delete operation fails
  - Response: `{ error: "Failed to delete project record: {database error message}" }`
  - Action: Log error, return error response
  - Note: Image has already been deleted at this point (orphaned storage scenario)

### Error Handling Strategy

**Fail-Fast Approach:**
The system validates inputs and authentication before performing any destructive operations. This prevents partial deletions and maintains data consistency.

**Ordered Operations:**
Operations are performed in a specific order to minimize inconsistent states:
1. Validate password (no side effects)
2. Fetch project (read-only)
3. Delete image (reversible by re-uploading)
4. Delete database record (final step)

**Graceful Degradation:**
- Missing images (404 from storage) are treated as warnings, not errors
- This handles cases where images were manually deleted or never uploaded
- Database deletion proceeds to clean up orphaned records

**Error Logging:**
All errors are logged to the server console with sufficient context:
```typescript
console.error("Image deletion failed:", error);
console.error("Database deletion failed:", error);
```

### Rollback Considerations

**No Automatic Rollback:**
The system does not implement automatic rollback because:
- Image deletion is the first destructive operation
- If it fails, database remains unchanged (consistent state)
- If database deletion fails after image deletion, we have orphaned storage
- Orphaned storage is preferable to orphaned database records (images can be manually cleaned)

**Manual Recovery:**
In the orphaned storage scenario:
- Error message indicates the issue
- Admin can manually delete the image from Supabase dashboard
- Or implement a cleanup script to find and remove orphaned images


## Testing Strategy

The delete-project feature requires both unit tests and property-based tests to ensure correctness and reliability.

### Testing Approach

**Dual Testing Strategy:**
- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs using randomized testing

Both approaches are complementary and necessary for comprehensive coverage. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Property-Based Testing

**Library Selection:**
- **JavaScript/TypeScript**: Use `fast-check` library for property-based testing
- Installation: `npm install --save-dev fast-check @types/fast-check`

**Configuration:**
- Each property test MUST run minimum 100 iterations (due to randomization)
- Each test MUST reference its design document property in a comment
- Tag format: `// Feature: delete-project, Property {number}: {property_text}`

**Property Test Implementation:**

Each correctness property from the design document should be implemented as a single property-based test:

1. **Property 1: Authentication Guards Deletion**
   ```typescript
   // Feature: delete-project, Property 1: Authentication Guards Deletion
   fc.assert(
     fc.asyncProperty(
       fc.string(), // random password
       fc.uuid(),   // random project ID
       async (wrongPassword, projectId) => {
         fc.pre(wrongPassword !== process.env.ADMIN_PASSWORD);
         const result = await deleteProjectAction(createFormData(wrongPassword, projectId));
         expect(result.error).toBeDefined();
         expect(result.success).toBeUndefined();
         // Verify database unchanged
       }
     ),
     { numRuns: 100 }
   );
   ```

2. **Property 2: Successful Deletion Removes Database Record**
   ```typescript
   // Feature: delete-project, Property 2: Successful Deletion Removes Database Record
   // Generate random project, insert it, delete it, verify it's gone
   ```

3. **Property 3: Non-Existent Projects Return Errors**
   ```typescript
   // Feature: delete-project, Property 3: Non-Existent Projects Return Errors
   // Generate random UUIDs that don't exist, verify error response
   ```

4. **Property 4: Image Cleanup Accompanies Deletion**
   ```typescript
   // Feature: delete-project, Property 4: Image Cleanup Accompanies Deletion
   // Create project with image, delete project, verify image gone
   ```

5. **Property 5: Image Deletion Precedes Database Deletion**
   ```typescript
   // Feature: delete-project, Property 5: Image Deletion Precedes Database Deletion
   // Mock storage failure, verify database unchanged
   ```

6. **Property 6: All Projects Appear in Admin List**
   ```typescript
   // Feature: delete-project, Property 6: All Projects Appear in Admin List
   // Generate random project sets, verify all appear in UI
   ```

7. **Property 7: Failures Return Descriptive Errors**
   ```typescript
   // Feature: delete-project, Property 7: Failures Return Descriptive Errors
   // Generate various failure scenarios, verify error messages present
   ```

8. **Property 8: Response Format Consistency**
   ```typescript
   // Feature: delete-project, Property 8: Response Format Consistency
   // For any input, verify response has success XOR error
   ```

### Unit Testing

**Focus Areas:**
Unit tests should focus on specific examples and edge cases that complement property tests:

1. **Specific Authentication Scenarios**
   - Test with correct password (happy path)
   - Test with empty password
   - Test with missing ADMIN_PASSWORD env var

2. **Edge Cases**
   - Project with missing image (orphaned database record)
   - Project with malformed image URL
   - Concurrent deletion attempts

3. **Integration Points**
   - Verify revalidatePath is called on success
   - Verify getAdminSupabase is used (not public client)
   - Verify correct storage bucket is targeted

4. **Error Message Quality**
   - Verify error messages are descriptive
   - Verify error messages don't leak sensitive information

**Example Unit Tests:**

```typescript
describe('deleteProjectAction', () => {
  it('should delete project with correct password', async () => {
    // Arrange: Create test project
    // Act: Call deleteProjectAction with correct password
    // Assert: Project gone, image gone, success response
  });

  it('should handle missing ADMIN_PASSWORD gracefully', async () => {
    // Arrange: Temporarily unset env var
    // Act: Attempt deletion
    // Assert: Configuration error returned
  });

  it('should continue deletion when image is already missing', async () => {
    // Arrange: Create project, manually delete image
    // Act: Delete project
    // Assert: Database record deleted, success response
  });
});
```

### Test Environment Setup

**Mocking Strategy:**
- Mock Supabase client for unit tests to avoid hitting real database
- Use test database for integration tests
- Mock storage operations to avoid actual file uploads/deletions in unit tests

**Test Data:**
- Use factories to generate test projects with realistic data
- Use UUIDs for test project IDs to avoid collisions
- Clean up test data after each test run

### Coverage Goals

- **Line Coverage**: Minimum 90% for deleteProjectAction
- **Branch Coverage**: 100% for error handling paths
- **Property Coverage**: All 8 correctness properties implemented as tests

