import ResultList from "../components/ResultList";

const ResultListPage = () => {
  return (
    <div className="w-full min-w-[360px] max-w-[1200px] mx-auto">
      <div className="px-[20px] md:px-[0px] mb-[58px] md:mb-[80px]">
        <ResultList type="calculate" />
      </div>
    </div>
  );
};

export default ResultListPage;
