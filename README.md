# threads-api-wrapper : a NodeJS SDK for Threads API

![GitHub package.json version](https://img.shields.io/github/package-json/v/mikescops/node-threads-api)
![npm](https://img.shields.io/npm/v/threads-api-wrapper)
![npm](https://img.shields.io/npm/dw/threads-api-wrapper)
![GitHub](https://img.shields.io/github/license/mikescops/node-threads-api)

A SDK in Javascript / Typescript for the Threads API

> [!WARNING]
> This project is work in progress and contributions are very welcome!
>
> It is in early development and is not yet ready for production use.

## Installation

```bash
npm install threads-api-wrapper
```

## Usage

```typescript
import ThreadsSDK from 'threads-api-wrapper';

const threadsApi = new ThreadsSDK();

const url = threadsApi.getAuthorizationUrl({
    clientId: '<your_client_id>',
    redirectUri: '<your_redirect_uri>',
    scopes: ['<your_scope>'],
});
```

### User

```typescript
/**
 * Retrieve profile information about a user on Threads.
 * @param params
 * @returns
 */
getUserProfile: (params: GetProfileParams) => Promise<ProfileResponse>;

/**
 * Retrieve a paginated list of all Threads posts created by a user.
 * @param params
 * @returns
 */
getUserThreads: (params: GetThreadsParams) => Promise<UserThreadsResponse>;

/**
 * Retrieve a paginated list of all Threads replies created by a user.
 * @param params
 * @returns
 */
getUserReplies: (params: GetThreadsParams) => Promise<UserRepliesResponse>;

/**
 * Check the app user's current publishing rate limit usage.
 * @param params
 * @returns
 */
getUserPublishingLimit: (params: GetPublishingLimitParams) => Promise<PublishingLimitResponse>;
```

### Post

```typescript
/**
 * Retrieve information about a media object or a thread on Threads.
 * @param params
 * @returns
 */
getMediaObject: (params: GetMediaParams): => Promise<ThreadData>;
```

### Insights

```typescript
/**
 * Retrieve insights for a Threads user object.
 * @param params
 * @returns
 */
getUserInsights: (params: GetUserInsightsParams) => Promise<UserInsightsResponse>;
/**
 * Retrieve insights for a Threads media object.
 * @param params
 * @returns
 */
getMediaInsights: (params: GetMediaInsightsParams) => Promise<MediaInsightsResponse>;
```

## Maintainer

| [![twitter/mikescops](https://avatars0.githubusercontent.com/u/4266283?s=100&v=4)](https://pixelswap.fr 'Personal Website') | [![threads/mikmik_1011](https://avatars.githubusercontent.com/u/40996107?s=100&v=4)](https://misa.st 'Personal Website') |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Corentin Mors](https://pixelswap.fr/)                                                                                      | [Misa Stefanovic](https://misa.st/)                                                                                      |
