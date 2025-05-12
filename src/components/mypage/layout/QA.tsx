import Loading from "@/hook/Loading";
import InquiryLayout from "./inquiry/InquiryLayout";
import { usePageStore } from "@/stores/usePageStore";
import { useQa } from "@/api/reactQuery/getQuery/useMy";

export default function QA() {
  const { currentPage, size } = usePageStore();
  const { data: qaData, isLoading } = useQa({ page: currentPage, size });

  if (isLoading) return <Loading />;

  return <InquiryLayout inquiry={qaData} />;
}
