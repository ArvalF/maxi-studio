<template>
    <UApp class="h-full w-full">
        <PageSkeleton>
          <template #header-content>
            <Header />
          </template>
          <template #main-content>
            <NuxtPage />
          </template>
        </PageSkeleton>
    </UApp>
</template>
