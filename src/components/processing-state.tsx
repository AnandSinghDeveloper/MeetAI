import EmptyState from "./empty-state";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
      <EmptyState
        image="/canceled.svg"
        title="Meeting Completed"
        discription="This meeting was completed , summary will appear soon."
      />
    </div>
  );
};
