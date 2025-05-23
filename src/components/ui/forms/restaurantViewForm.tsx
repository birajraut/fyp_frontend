/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import CustomButton from "../CustomButton";

interface IProps {
  data: any;
  setIsModalOpen: (open: boolean) => void;
}

const RestaurantViewForm = ({ data, setIsModalOpen }: IProps) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        name="name"
        label="Restaurant Name"
        value={data?.name}
        readOnly
      />
      <Input
        type="text"
        name="location"
        label="Location"
        value={data?.location}
        readOnly
      />
      <Input
        type="text"
        name="owner"
        label="Owner"
        value={data?.creator?.fullName}
        readOnly
      />
      <Input
        type="email"
        name="email"
        label="Email"
        value={data?.email}
        readOnly
      />
      <Textarea
        name="description"
        label="Description"
        value={data?.description || "No description provided"}
        readOnly
      />
      <div className="mt-6 text-right">
        <CustomButton
          label="Close"
          type="button"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default RestaurantViewForm;
