/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    locations: Location;
    stamps: Stamp;
    postcards: Postcard;
    invitations: Invitation;
    signedPostcards: SignedPostcard;
    landmarks: Landmark;
    landmarkLocations: LandmarkLocation;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    locations: LocationsSelect<false> | LocationsSelect<true>;
    stamps: StampsSelect<false> | StampsSelect<true>;
    postcards: PostcardsSelect<false> | PostcardsSelect<true>;
    invitations: InvitationsSelect<false> | InvitationsSelect<true>;
    signedPostcards: SignedPostcardsSelect<false> | SignedPostcardsSelect<true>;
    landmarks: LandmarksSelect<false> | LandmarksSelect<true>;
    landmarkLocations: LandmarkLocationsSelect<false> | LandmarkLocationsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations".
 */
export interface Location {
  id: number;
  name: string;
  slug: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "stamps".
 */
export interface Stamp {
  id: number;
  name: string;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "postcards".
 */
export interface Postcard {
  id: number;
  name: string;
  slug: string;
  location: number | Location;
  pageContent: {
    subtitle: string;
    title: string;
    backgroundImage?: (number | null) | Media;
  };
  /**
   * Used for SEO and social sharing.
   */
  metadata?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
    /**
     * Adds <meta name='robots' content='noindex'>
     */
    noIndex?: boolean | null;
  };
  front: {
    mainImage: number | Media;
    borderPattern?: (number | null) | Media;
  };
  back: {
    borderPattern?: (number | null) | Media;
    messageText: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    postageStamp: number | Stamp;
    signatureText: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
  };
  /**
   * Shown in the bottom right corner of the postcard, like #YoursDigitally
   */
  hashtag?: string | null;
  borderImage?: (number | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "invitations".
 */
export interface Invitation {
  id: number;
  name: string;
  slug: string;
  pageContent: {
    subtitle: string;
    title: string;
    backgroundImage?: (number | null) | Media;
  };
  /**
   * Used for SEO and social sharing.
   */
  metadata?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
    /**
     * Adds <meta name='robots' content='noindex'>
     */
    noIndex?: boolean | null;
  };
  front: {
    mainImage: number | Media;
    borderPattern?: (number | null) | Media;
  };
  back: {
    borderPattern?: (number | null) | Media;
    messageText: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    postageStamp: number | Stamp;
    signatureText: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
  };
  registrations?:
    | {
        fullName: string;
        registeredAt?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "signedPostcards".
 */
export interface SignedPostcard {
  id: number;
  template: number | Postcard;
  signature: string;
  slug?: string | null;
  analytics?: {
    opens?: number | null;
    shares?: number | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landmarks".
 */
export interface Landmark {
  id: number;
  name: string;
  slug: string;
  location?: (number | null) | LandmarkLocation;
  pageContent: {
    subtitle: string;
    title: string;
    backgroundImage?: (number | null) | Media;
  };
  postcards?: (number | Postcard)[] | null;
  /**
   * Used for SEO and social sharing.
   */
  metadata?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
    /**
     * Adds <meta name='robots' content='noindex'>
     */
    noIndex?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landmarkLocations".
 */
export interface LandmarkLocation {
  id: number;
  name: string;
  slug: string;
  street: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'locations';
        value: number | Location;
      } | null)
    | ({
        relationTo: 'stamps';
        value: number | Stamp;
      } | null)
    | ({
        relationTo: 'postcards';
        value: number | Postcard;
      } | null)
    | ({
        relationTo: 'invitations';
        value: number | Invitation;
      } | null)
    | ({
        relationTo: 'signedPostcards';
        value: number | SignedPostcard;
      } | null)
    | ({
        relationTo: 'landmarks';
        value: number | Landmark;
      } | null)
    | ({
        relationTo: 'landmarkLocations';
        value: number | LandmarkLocation;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations_select".
 */
export interface LocationsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  coords?:
    | T
    | {
        latitude?: T;
        longitude?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "stamps_select".
 */
export interface StampsSelect<T extends boolean = true> {
  name?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "postcards_select".
 */
export interface PostcardsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  location?: T;
  pageContent?:
    | T
    | {
        subtitle?: T;
        title?: T;
        backgroundImage?: T;
      };
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
        noIndex?: T;
      };
  front?:
    | T
    | {
        mainImage?: T;
        borderPattern?: T;
      };
  back?:
    | T
    | {
        borderPattern?: T;
        messageText?: T;
        postageStamp?: T;
        signatureText?: T;
      };
  hashtag?: T;
  borderImage?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "invitations_select".
 */
export interface InvitationsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  pageContent?:
    | T
    | {
        subtitle?: T;
        title?: T;
        backgroundImage?: T;
      };
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
        noIndex?: T;
      };
  front?:
    | T
    | {
        mainImage?: T;
        borderPattern?: T;
      };
  back?:
    | T
    | {
        borderPattern?: T;
        messageText?: T;
        postageStamp?: T;
        signatureText?: T;
      };
  registrations?:
    | T
    | {
        fullName?: T;
        registeredAt?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "signedPostcards_select".
 */
export interface SignedPostcardsSelect<T extends boolean = true> {
  template?: T;
  signature?: T;
  slug?: T;
  analytics?:
    | T
    | {
        opens?: T;
        shares?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landmarks_select".
 */
export interface LandmarksSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  location?: T;
  pageContent?:
    | T
    | {
        subtitle?: T;
        title?: T;
        backgroundImage?: T;
      };
  postcards?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
        noIndex?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landmarkLocations_select".
 */
export interface LandmarkLocationsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  street?: T;
  coords?:
    | T
    | {
        latitude?: T;
        longitude?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PostcardsByLocation".
 */
export interface PostcardsByLocation {
  [k: string]: {
    location: Location;
    postcards: Postcard[];
  };
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}