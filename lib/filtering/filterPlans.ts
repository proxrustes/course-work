import { study_plan } from "@/app/api/study-plan/route";
import { FilterState } from "@/components/pages/study-plans/FilterMenu";

function dragdownFilter(study_plan: study_plan, filterState: FilterState): boolean {
  if (filterState.is_approved === "all") return true
  return (
    (filterState.is_approved === "only" && study_plan.is_approved === 1) ||
    (filterState.is_approved === "not" && study_plan.is_approved === 0)
  )
}

export function filterPLans(
  plans: study_plan[],
  filterState: FilterState
): study_plan[] {
  return plans.filter((plan) => dragdownFilter(plan, filterState))

}