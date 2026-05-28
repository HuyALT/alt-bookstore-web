export interface AddressRequest {
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
    phoneNumber: string;
    isDefault: boolean;
}