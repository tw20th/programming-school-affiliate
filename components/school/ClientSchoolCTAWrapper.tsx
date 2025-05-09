'use client'

import SchoolCTAButton from './SchoolCTAButton'

type Props = {
  schoolId: string
  affiliateUrl: string
}

export default function ClientSchoolCTAWrapper({
  schoolId,
  affiliateUrl,
}: Props) {
  return (
    <div className="mt-6">
      <SchoolCTAButton schoolId={schoolId} affiliateUrl={affiliateUrl} />
    </div>
  )
}
