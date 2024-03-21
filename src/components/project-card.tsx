import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface ProjectCardProps {
  img: string;
  title: string;
  desc: string;
}

export function ProjectCard({ img, title, desc }: ProjectCardProps) {
  return (
    <Card color="transparent" shadow={false} >
      <div className="mx-0 mt-0 ">
        <Image
          src={img}
          alt={title}
          width={768}
          height={768}
          className="w-30 h-30"
        />
      </div>
      <CardBody className="p-0 flex flex-col items-center justify-center">
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-800"
        >
          <Typography variant="h5" className="mb-2">
            {title}
          </Typography>
        </a>

        <Button color="blue" size="lg">
          View
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
