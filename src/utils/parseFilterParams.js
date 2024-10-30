// const parseType = (type) => {
//   const isString = typeof type === 'string';
//   if (!isString) return null;
//   const isType = (type) => ['work', 'home', 'personal'].includes(type);

//   if (isType(type)) return type;
// };

// const parseFavourite = (isFavourite) => {
//   if (typeof isFavourite === 'string') {
//     return isFavourite === 'true';
//   }

//   const isBoolean = typeof isFavourite === 'boolean';
//   if (!isBoolean) return null;

//   return isFavourite;
// };
// export const parseFilterParams = (query) => {
//   const { type, isFavourite } = query;

//   const parsedType = parseType(type);
//   const parsedFavourite = parseFavourite(isFavourite);

//   return {
//     type: parsedType,
//     isFavourite: parsedFavourite,
//   };
// };
