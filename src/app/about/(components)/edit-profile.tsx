"use client";

import { AvatarUploader } from "@/components/avatar-uploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { updateProfile } from "@/server-actions/profile-actions";
import { GetProfileResponseData, UpdateAndCreateProfileRequestDataSchema } from "@/zod/profile-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditProfile = ({
  isEditProfile,
  userProfileData
}: {
  isEditProfile: boolean;
  userProfileData?: GetProfileResponseData['data'];
}) => {
  const birthday = userProfileData?.birthday ? new Date(userProfileData.birthday) : undefined;
  const height = userProfileData?.height ? userProfileData.height.toString() : '';
  const weight = userProfileData?.weight ? userProfileData.weight.toString() : '';

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateAndCreateProfileRequestDataSchema>>({
    // @ts-expect-error dont know why zod is behaving like this
    resolver: zodResolver(UpdateAndCreateProfileRequestDataSchema),
    defaultValues: {
      ...userProfileData,
      birthday,
      // @ts-expect-error dont know why zod is behaving like this
      height,
      // @ts-expect-error dont know why zod is behaving like this
      weight,
      avatar: undefined
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateAndCreateProfileRequestDataSchema>) => {
    console.log({
      message: "edi-profile - save",
      values
    });

    try {
      const response = await updateProfile(values);
      console.log({ updatedProfile: response });
      router.push('/about');
    } catch (error) {
      console.log({ error });
    }

  };

  if (!isEditProfile) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4" autoComplete="none">
        <Button type="submit" className="top-1/3 right-4 absolute" variant={"link"}>
          Save and Update
        </Button>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <FormControl>
                <AvatarUploader onSelectImage={field.onChange} currentImageUrl={userProfileData?.avatar} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <Label className="w-full" htmlFor="name">Display Name: </Label>
              <FormControl>
                <Input className="w-full" placeholder="Enter Name" {...field} autoComplete="none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <Label className="w-full" htmlFor="birthday">Birthday: </Label>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-fit text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Label className="w-full" htmlFor="horoscope">Horoscope: </Label>
          <Input className="w-full" value={userProfileData?.horoscope} autoComplete="none" readOnly disabled />
        </div>
        <div className="flex justify-between">
          <Label className="w-full" htmlFor="zodiac">Zodiac: </Label>
          <Input className="w-full" value={userProfileData?.zodiac} autoComplete="none" readOnly disabled />
        </div>
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <Label className="w-full" htmlFor="height">Height: </Label>
              <FormControl>
                <Input className="w-full" placeholder="Enter Height" {...field} type="number" autoComplete="none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <Label className="w-full" htmlFor="weight">Weight: </Label>
              <FormControl>
                <Input className="w-full" placeholder="Enter Weight" {...field} autoComplete="none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EditProfile;