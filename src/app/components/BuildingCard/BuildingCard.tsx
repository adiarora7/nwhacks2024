import { Button } from "@/components/ui/button";
import { Location } from "../Search/SearchBox";
import MotionWrapper from '../motion';
import styles from "./buildingCard.module.scss";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BuildingCard({
  coordinates,
}: {
  coordinates: Location;
}) {
  const locationImage = {
    "Life Sciences Institute":
      "https://learningspaces.ubc.ca/sites/learningspaces.ubc.ca/files/styles/room_images/public/classroom-images/LSC%201.jpg?itok=ka2_Ee6h&c=e5953b2f3f6b982e3eab4b23b13ef573",
    "AMS Student Nest":
      "https://images.squarespace-cdn.com/content/v1/5ebc9e8d23cc92055ab51423/1590084041285-KVBNS8K4YM6XCTEWVDIE/Brett-Ryan-Studios-UBC-Legacy-Book-1008.jpg",
  };

  const defaultLocationImage =
    "https://you.ubc.ca/wp-content/uploads/2020/04/UBC-Vancouver-campus-2.jpg";

  return (
    <Card className="flex flex-col items-start bg-[#F8F8F8] !opacity-100 w-full z-10 pt-3 !rounded-bl-none !rounded-br-none">
      <CardHeader className="pb-0 !mb-0">
        <CardTitle className="text-lg">{coordinates?.name}</CardTitle>
        <CardDescription>{coordinates?.address}</CardDescription>
      </CardHeader>
      <CardHeader className="!pt-0 !mt-2">
        <div className="flex w-full flex-col">
          <div className="flex w-full">
            <div className="flex bg-white rounded-sm border-slate-400 px-2 py-1 mr-2">
              <span className="text-xs mr-1">Wheelchair accessible</span>{" "}
              <CloseIcon />
            </div>
            <div className="flex bg-white rounded-sm border-slate-400 px-2 py-1">
              <span className="text-xs mr-1">Inclusive Space</span>{" "}
              <CloseIcon />
            </div>
          </div>
          {/* rating */}
          <div className="flex w-full items-end mt-4">
            <span className="text-xs text-gray-600 mr-2">5.0</span>
            {[0, 1, 2, 3, 4].map((_, index) => (
              <StarIcon key={index} /> // Adding a unique key prop for each StarIcon
            ))}
          </div>
          <div className="flex mt-6">
            <img
              src={
                coordinates.name in locationImage
                  ? locationImage[coordinates.name]
                  : defaultLocationImage
              }
              className="rounded-md"
            />
          </div>
          {/* three buttons */}
          <div className="flex w-full h-full items-center justify-between mt-4">
              <Button className="flex w-full mr-2 bg-[#319795] font-semibold text-white">View Indoor Map</Button>
              <Button className="flex w-full mr-2 bg-[#D53F8C] font-semibold text-white">Give a Rating</Button>
              <Button className="flex h-10 w-10 rounded-md bg-black">
                <CameraIcon />
              </Button>
            

          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="rgba(173,184,194,1)"
    >
      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="rgba(240,187,64,1)"
    >
      <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
    </svg>
  );
}


function CameraIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="rgba(255,255,255,1)"><path d="M9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7L9 3ZM12 19C15.3137 19 18 16.3137 18 13C18 9.68629 15.3137 7 12 7C8.68629 7 6 9.68629 6 13C6 16.3137 8.68629 19 12 19ZM12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13C16 15.2091 14.2091 17 12 17Z"></path></svg> 
  )
}