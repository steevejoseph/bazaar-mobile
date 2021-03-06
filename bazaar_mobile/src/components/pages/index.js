// same as export * from './File'
// however, above only works with NAMED exports
// however, redux requires default exports

// https://stackoverflow.com/a/34072770

export { default as Explore } from './Explore';
export { default as Favorites } from './Favorites';
export { default as Inbox } from './Inbox';
export { default as Profile } from './Profile';
export { default as MyServices } from './MyServices';
export { default as ServiceView } from './ServiceView';
export { default as MyServiceView } from './MyServiceView';
export { default as ServiceCreate } from './ServiceCreate';
export { default as ServiceEdit } from './ServiceEdit';
export { default as UserView } from './UserView';
