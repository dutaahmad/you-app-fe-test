import { z } from "zod";

export const GetProfileResponseDataSchema = z.object({
    message: z.string(),
    data: z.object({
        email: z.string(),
        username: z.string(),
        name: z.string(),
        birthday: z.string(),
        horoscope: z.string(),
        zodiac: z.string(),
        height: z.number(),
        weight: z.number(),
        interests: z.array(z.string()),
        avatar: z.string().optional(),
    })
});

export const UpdateProfileResponseDataSchema = GetProfileResponseDataSchema;
export const CreateProfileResponseDataSchema = GetProfileResponseDataSchema;

export const UpdateAndCreateProfileRequestDataSchema = z.object({
    name: z.string().optional(),
    birthday: z.string().optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
    interests: z.array(z.string()).optional()
});

export type GetProfileResponseData = z.infer<typeof GetProfileResponseDataSchema>;
export type UpdateProfileResponseData = z.infer<typeof UpdateProfileResponseDataSchema>;
export type CreateProfileResponseData = z.infer<typeof CreateProfileResponseDataSchema>;
export type UpdateAndCreateProfileRequestData = z.infer<typeof UpdateAndCreateProfileRequestDataSchema>;