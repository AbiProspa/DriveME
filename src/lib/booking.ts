export type BookingRequest = {
    fullName: string;
    email: string;
    phone: string;
    pickup: string;
    destination: string;
    date: string;
    notes?: string;
};

export type BookingValidationResult = {
    isValid: boolean;
    errors: Partial<Record<keyof BookingRequest, string>>;
};

const PHONE_REGEX = /^\+?[0-9\s()-]{7,20}$/;

export function normalizeBookingInput(payload: unknown): BookingRequest {
    const input = (typeof payload === "object" && payload !== null ? payload : {}) as Partial<BookingRequest>;

    return {
        fullName: input.fullName?.trim() ?? "",
        email: input.email?.trim() ?? "",
        phone: input.phone?.trim() ?? "",
        pickup: input.pickup?.trim() ?? "",
        destination: input.destination?.trim() ?? "",
        date: input.date?.trim() ?? "",
        notes: input.notes?.trim() ?? "",
    };
}

export function validateBookingInput(input: BookingRequest): BookingValidationResult {
    const errors: BookingValidationResult["errors"] = {};

    if (!input.fullName) {
        errors.fullName = "Full name is required.";
    } else if (input.fullName.length < 2) {
        errors.fullName = "Full name must be at least 2 characters.";
    }

    if (!input.email) {
        errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!input.phone) {
        errors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(input.phone)) {
        errors.phone = "Enter a valid phone number.";
    }

    if (!input.pickup) {
        errors.pickup = "Pickup location is required.";
    } else if (input.pickup.length < 2) {
        errors.pickup = "Pickup location must be at least 2 characters.";
    }

    if (!input.destination) {
        errors.destination = "Destination is required.";
    } else if (input.destination.length < 2) {
        errors.destination = "Destination must be at least 2 characters.";
    } else if (input.destination.toLowerCase() === input.pickup.toLowerCase()) {
        errors.destination = "Destination must be different from pickup.";
    }

    if (!input.date) {
        errors.date = "Travel date is required.";
    } else {
        const travelDate = new Date(`${input.date}T00:00:00`);

        if (Number.isNaN(travelDate.getTime())) {
            errors.date = "Enter a valid travel date.";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (travelDate < today) {
                errors.date = "Travel date cannot be in the past.";
            }
        }
    }

    if (input.notes && input.notes.length > 500) {
        errors.notes = "Additional notes must be 500 characters or fewer.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

export function getTodayDateInputValue() {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
}
