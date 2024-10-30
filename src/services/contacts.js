// import { contactsCollection } from '../db/contacts.js';
// import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { SORT_ORDER } from '../constants/index.js';

// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = 'name',
//   filter = {},
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactsQuery = contactsCollection.find({ userId: filter.userId });

//   if (filter.type) {
//     contactsQuery.where('contactType').equals(filter.type);
//   }
//   if (filter.isFavourite) {
//     contactsQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   const [contactsCount, contacts] = await Promise.all([
//     contactsCollection.find().merge(contactsQuery).countDocuments(),
//     contactsQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);
//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = async ({ _id: contactId, userId }) => {
//   const contact = await contactsCollection.findOne({ _id: contactId, userId });
//   return contact;
// };

// export const createContact = async (payload) => {
//   const contact = await contactsCollection.create(payload);
//   return contact;
// };
// export const deleteContact = async (contactId, userId) => {
//   const contact = await contactsCollection.findOneAndDelete({
//     _id: contactId,
//     userId,
//   });
//   return contact;
// };
// export const updateContact = async (
//   contactId,
//   userId,
//   payload,
//   option = {},
// ) => {
//   const result = await contactsCollection.findOneAndUpdate(
//     { _id: contactId, userId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...option,
//     },
//   );
//   if (!result || !result.value) return null;

//   return {
//     contact: result.value,
//     isNew: Boolean(result?.lastErrorObject?.upserted),
//   };
// };
