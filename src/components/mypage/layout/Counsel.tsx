import Loading from "@/hook/Loading";
import InquiryLayout from "./inquiry/InquiryLayout";
import { usePageStore } from "@/stores/usePageStore";
import { useCounsel } from "@/api/reactQuery/getQuery/useMy";

export default function Counsel() {
  const { currentPage, size } = usePageStore();
  const { data: inquiries, isLoading } = useCounsel({ page: currentPage, size });

  if (isLoading) return <Loading />;

  return <InquiryLayout inquiry={inquiries} />;
}
