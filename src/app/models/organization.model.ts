export class Organization {
    completed: string[];
    loading = false;
    success = true;
    receipients: String[];
    receipients_loaded: boolean;
    organizationMembers: string[];
    members_loading: boolean;
    Follow: boolean;
    donation: boolean;
    network: boolean;
    message: boolean;
    age: any;
    countryRestriction: string[];
    defaultSettings: string[];
    org_deletion_success: boolean;
    org_deletion_failed: boolean;
    org_channels_loading: boolean;
    org_channels_loaded: boolean;
    org_channels: any[];
}

export const initialOrganization: Organization = {
    completed: [],
    loading: false,
    success: true,
    receipients: [],
    receipients_loaded: false,
    organizationMembers: [],
    members_loading: false,
    Follow: false,
    donation: false,
    network: false,
    message: false,
    age: [],
    countryRestriction: [],
    defaultSettings: [],
    org_deletion_success: false,
    org_deletion_failed: false,
    org_channels_loading: false,
    org_channels_loaded: false,
    org_channels: []
};

