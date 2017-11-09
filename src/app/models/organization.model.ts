export class Organization {
    completed: string[];
    loading = false;
    success = true;
    receipients: String[];
    receipients_loaded: boolean;
    organizationMembers: string[];
    members_loading: boolean;
}

export const initialOrganization: Organization = {
    completed: [],
    loading: false,
    success: true,
    receipients: [],
    receipients_loaded: false,
    organizationMembers: [],
    members_loading: false,
};

