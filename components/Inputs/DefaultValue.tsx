import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PageProps = {
  data: any;
  id: string;
};

export default function DefaultValue({ data, id }: PageProps) {
  const sec = ["65c88249d0186d647728bad5"];
  console.log(data);
  console.log(id);
  let values = [];
  for (let i of id) {
    console.log(i);
    values.push(data.find((value: any) => value.id === i));
  }

  return (
    <div>
      <div className="mb-2">
        <Label htmlFor="cat">Old Category</Label>
      </div>
      <Input id="cat" type="text" value={values} />
    </div>
  );
}
