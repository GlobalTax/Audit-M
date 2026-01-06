UPDATE services 
SET is_active = false, updated_at = now()
WHERE id IN (
  'aad590af-b60c-4e10-a9f3-749b6e8f46d3',
  'f982dd90-1f86-4b23-b52b-aaada5eb8fd1',
  'e5567a91-ead2-42a6-b094-b2e0758703b5',
  '6b1d1739-498c-4b04-b62f-6d938967b452',
  '3db42c4b-9802-41d6-947e-20ec6454ffb8',
  '9cf6a09e-ae8d-49e3-be64-c2ff0baa2a15',
  '00d946ed-2f78-4d55-be5f-3188192b7cb8',
  'aa837d66-ad69-4228-8678-0af397897bcd'
);