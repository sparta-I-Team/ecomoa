import { Compass, Minus, Plus } from "lucide-react";

const MapController = ({
  onZoomIn,
  onZoomOut,
  onCurrentLocation
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCurrentLocation: () => void;
}) => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-[1px] z-10">
      <div className="flex flex-col gap-[5px] rounded-xl shadow-lg overflow-hidden">
        <button
          className="flex flex-row  items-center gap-[4px] bg-[white] w-[88px] h-[32px] rounded-3xl border-gray-300 "
          onClick={onCurrentLocation}
        >
          <Compass size={14} className="ml-4" />
          <p className="text-[14px]">내위치</p>
        </button>
        <button
          className="flex flex-row  items-center gap-[4px] bg-[white] w-[88px] h-[32px] rounded-3xl border-gray-300"
          onClick={onZoomIn}
        >
          <Plus size={14} className="ml-4" />
          <p className="text-[14px]">확대</p>
        </button>
        <button
          className="flex flex-row  items-center gap-[4px] bg-[white] w-[88px] h-[32px] rounded-3xl border-gray-300"
          onClick={onZoomOut}
        >
          <Minus size={14} className="ml-4" />
          <p className="text-[14px]">축소</p>
        </button>
      </div>
    </div>
  );
};
export default MapController;
