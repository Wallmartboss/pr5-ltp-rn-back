import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = { ...parseFilterParams(req.query), userId };
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
    res.json({
      status: 200,
      message: `Successfully found contacts!`,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const contact = await getContactById({ _id: contactId, userId });
    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    // Відповідь, якщо контакт знайдено
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({ ...req.body, userId, photo: photoUrl });
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  if (req.body.userId) delete req.body.userId;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createError(404, 'contact not found'));
    return;
  }

  res.status(204).send();
};
export const upsertContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const result = await updateContact(contactId, userId, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted contact with id ${contactId}!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });
  if (!result) {
    next(createError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched contact with id ${contactId}!`,
    data: result.contact,
  });
};
