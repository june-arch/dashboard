import prisma from "@/services/lib/prisma";
import { fetchRoles } from "@/services/server-actions";
import { TRole } from "@/services/types/role";
import { Container, Title, Text, Anchor, Stack, TextInput, Button } from "@mantine/core";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const roles = await fetchRoles();

  const submitAction = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    await prisma.roles.create({
      data: {
        name: name as string,
      }
    });

    revalidatePath("/");
  }
  return (
    <Container p="xl" mt={200}>
      <Title mb="md">Welcome to Kenstack Mantine Prisma!</Title>
      <Text>
        This template is crafted using modern technologies to provide a solid
        foundation for your next project. It includes:
      </Text>
      <Text mt="md">
        <strong>
          <Anchor
            href="https://mantine.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mantine UI
          </Anchor>
        </strong>
        : A comprehensive and customizable UI component library.
      </Text>
      <Text>
        <strong>
          <Anchor
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </Anchor>
        </strong>
        : A popular React framework for server-side rendering and static site
        generation.
      </Text>
      <Text>
        <strong>
          <Anchor
            href="https://bun.sh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bun
          </Anchor>
        </strong>
        : A fast and efficient package manager, bundler, and test runner.
      </Text>
      <Text>
        <strong>
          <Anchor
            href="https://www.prisma.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prisma
          </Anchor>
        </strong>
        : A next-generation ORM for simplified database access and management.
      </Text>
      <Text mt="md">
        Enjoy building your application with Kenstack Mantine Prisma!
      </Text>

      <form action={submitAction}>
        <TextInput placeholder="input nama role" name="name" label="Role Name" required/>
        <Button size="compact-md" mt={'sm'} type="submit">submit</Button>
      </form>

      <Stack>
        {roles.map((val: TRole, key: number) => {
          return <Text key={key}>{val.name}</Text>;
        })}
      </Stack>
    </Container>
  );
}
